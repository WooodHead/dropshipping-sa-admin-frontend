import React, { FC, useCallback, useRef, useState } from "react"
import {
  Edit,
  Create,
  BooleanInput,
  NumberInput,
  TabbedForm,
  TextInput,
  FormTab,
  FieldProps,
  ImageInput,
  useDataProvider,
  ReferenceInput,
  SelectInput,
  useEditController,
  ImageField,
  useNotify,
  useRefresh,
  useRedirect,
} from "react-admin"
import RichTextInput from "ra-input-rich-text"

import Avatar from "@material-ui/core/Avatar"
import { Close } from "@material-ui/icons"
import Axios from "axios"
import { Photo, Product } from "../../../../../types"
import { API_URL } from "../../../../../config/constants"
import { uploadPhoto } from "../../../../../services/photos.service"

const RenderImage: FC<FieldProps<any>> = ({ record, source }) => {
  if (!record) {
    return <div />
  }
  return (
    <img
      style={{
        height: 250,
        width: 250,
      }}
      src={typeof record === "object" ? record.src : record}
      title="title"
    />
  )
}

const Image: FC<FieldProps<Product>> = ({ record }) => {
  const [photos, setPhotos] = useState<Photo[] | undefined>(record?.photos)
  const dataProvider = useDataProvider()
  if (!photos) {
    return <div />
  }

  const deleteImage = async (image: Photo) => {
    await dataProvider.delete<Photo>("photos", {
      id: image.id,
      previousData: image,
    })
    setPhotos([...photos.filter((photo) => photo.id !== image.id)])
  }

  const uploadImage = async (file: File) => {
    if (record?.id) {
      const form = new FormData()
      form.append("file", file)
      form.append("productId", String(record.id))
      const { data } = await Axios.post(`${API_URL}/photos`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setPhotos([...photos, data])
    }
  }

  const uploadMany = async (files: File[]) => {
    // files.map(async (file) => {
    //   if (file instanceof File) {
    //     return uploadImage(file)
    //   }
    // })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <ImageInput
        onChange={uploadMany}
        multiple
        source="none"
        label="صور المنتج"
        accept="image/*"
        placeholder={<p>برجاء رفع صور المنتج هنا</p>}
      >
        <div />
        {/* <ImageField source="src" title="title"/> */}
      </ImageInput>
      {photos.map((photo) => (
        <div
          key={photo.url}
          style={{
            backgroundColor: "#fff",
            margin: 10,
            position: "relative",
          }}
        >
          <Avatar
            variant="square"
            src={photo.url}
            alt="title"
            style={{
              width: 300,
              height: 300,
            }}
          />
          <Close
            onClick={() => deleteImage(photo)}
            style={{
              color: "red",
              position: "absolute",
              top: 10,
              right: 10,
            }}
            fontSize="large"
          />
        </div>
      ))}
    </div>
  )
}

export const CreateProduct = (props) => {
  const notify = useNotify()
  const refresh = useRefresh()
  const redirect = useRedirect()

  const [thumb, setThumb] = useState<string>("")
  const [photos, setPhotos] = useState<File[]>([] as File[])
  const thumbRef = useRef<string>("")
  const photosRef = useRef<File[]>([])
  thumbRef.current = thumb
  photosRef.current = photos

  const changeThumb = useCallback((e) => {
    uploadPhoto(e).then((url) => {
      setThumb(url)
    })
  }, [])

  const changePhoto = useCallback((e) => {
    setPhotos(e)
  }, [])

  const uploadImage = async (file: File, id: number) => {
    const form = new FormData()
    form.append("file", file)
    form.append("productId", String(id))
    const { data } = await Axios.post(`${API_URL}/photos`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setPhotos([...photos, data])
  }
  const onSuccess = async (res) => {
    const { id } = res?.data
    console.log("id", id)
    if (id) {
      console.log("photos", photosRef.current)
      await Promise.all(
        photosRef.current.map(async (file) => await uploadImage(file, id))
      )
    }
    notify("تم إنشاء المنتج بنجاح")
    redirect("/products")
    refresh()
  }

  // const transform = (data) => ({
  //   ...data,
  //   thumbnail: thumb,
  // })
  const transform = useCallback((data) => {
    return {
      ...data,
      thumbnail: thumbRef.current,
    }
  }, [])

  return (
    <Create {...props} onSuccess={onSuccess} transform={transform}>
      <TabbedForm>
        <FormTab label="بيانات المنتج">
          <TextInput source="name" label="إسم المنتج" fullWidth multiline />
          <NumberInput source="price" label="سعر البيع للمستخدم" fullWidth />
          <NumberInput
            source="vendorPrice"
            label="السعر الخاص بالمورد"
            fullWidth
          />
          <NumberInput source="vat" label="ضريبة القيمة المضافة" fullWidth />
          <TextInput source="sku" label="كود المنتج sku" fullWidth />
          <TextInput source="slug" label="رابط المنتج" fullWidth />
          <NumberInput
            source="stockCount"
            label="عدد القطع المتوفرة بالمخزون"
            fullWidth
          />
          <BooleanInput source="isDeleted" label="جعل المنتج غير متاح" />
          <ReferenceInput
            label="المورد"
            source="vendorId"
            reference="users"
            fullWidth
          >
            <SelectInput source="name" optionText="name" />
          </ReferenceInput>
          <TextInput
            multiline
            fullWidth
            rows={5}
            source="description"
            label="وصف المنتج"
          />
        </FormTab>
        <FormTab label="الاقسام والبراندات" path="category-brands">
          <ReferenceInput
            label="القسم"
            source="categoryId"
            reference="categories"
          >
            <SelectInput source="name" optionText="name" />
          </ReferenceInput>
          <ReferenceInput label="البراند" source="brandId" reference="brands">
            <SelectInput source="name" optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="صور المنتج" path="photos">
          {/*<Image source="photos" />*/}
          <ImageInput
            source="thumb"
            onChange={changeThumb}
            label="صورة المنتج الرئيسية"
            accept="image/*"
            placeholder={<p>برجاء رفع صورة المنتج الرئيسية هنا</p>}
          >
            <ImageField source="" />
          </ImageInput>
          <ImageInput
            source="photos"
            onChange={changePhoto}
            label="صور المنتج"
            accept="image/*"
            placeholder={<p>برجاء رفع صور المنتج</p>}
            multiple
          >
            <ImageField source="" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Create>
  )
}
