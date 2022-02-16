import React, { FC, useState } from "react"
import {
  Edit,
  BooleanInput,
  NumberInput,
  TabbedForm,
  TextInput,
  FormTab,
  FieldProps,
  ImageInput,
  useDataProvider,
  useEditController,
  ImageField,
  ReferenceInput,
  SelectInput,
} from "react-admin"
import RichTextInput from "ra-input-rich-text"

import Avatar from "@material-ui/core/Avatar"
import { Close } from "@material-ui/icons"
import Axios from "axios"
import { Photo, Product } from "../../../../../types"
import { API_URL } from "../../../../../config/constants"

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
  const [photos, setPhotos] = useState<Photo[]>(record?.photos || [])
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
      setPhotos((old) => [...old, data])
    }
  }

  const uploadMany = async (files: File[]) => {
    await Promise.all(
      files.map(async (file) => {
        if (file instanceof File) {
          await uploadImage(file)
        }
      })
    )
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

export const ProductEdit = (props) => {
  const { record } = useEditController<Product>(props)

  const changeThumb = async (e) => {
    const data = new FormData()
    data.append("file", e)
    await Axios.patch(`${API_URL}/products/thumb/${record?.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  }
  return (
    <Edit {...props}>
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
          <BooleanInput source="isDeleted" label="المنتج محذوف" />
          <BooleanInput source="isActive" label="نشط" />
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
          <ImageInput
            source=""
            onChange={changeThumb}
            label="صورة المنتج الرئيسية"
            accept="image/*"
          >
            <ImageField source="thumbnail" title="title" />
          </ImageInput>
          <Image source="photos" />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}
