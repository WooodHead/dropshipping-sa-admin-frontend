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
  required,
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
        label="?????? ????????????"
        accept="image/*"
        placeholder={<p>?????????? ?????? ?????? ???????????? ??????</p>}
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
    notify("???? ?????????? ???????????? ??????????")
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
        <FormTab label="???????????? ????????????">
          <TextInput
            source="name"
            label="?????? ????????????"
            fullWidth
            multiline
            validate={required()}
          />
          <NumberInput
            source="price"
            label="?????? ?????????? ????????????????"
            fullWidth
            validate={required()}
          />
          <NumberInput
            source="vendorPrice"
            label="?????????? ?????????? ??????????????"
            fullWidth
            validate={required()}
          />
          <NumberInput
            source="vat"
            label="?????????? ???????????? ??????????????"
            fullWidth
            validate={required()}
          />
          <TextInput
            source="sku"
            label="?????? ???????????? sku"
            fullWidth
            validate={required()}
          />
          <TextInput
            source="slug"
            label="???????? ????????????"
            fullWidth
            validate={required()}
          />
          <NumberInput
            source="stockCount"
            label="?????? ?????????? ???????????????? ????????????????"
            fullWidth
            validate={required()}
          />
          <BooleanInput
            source="isDeleted"
            label="???????????? ??????????"
            defaultValue={false}
          />
          <BooleanInput source="isActive" label="??????" defaultValue={false} />
          <ReferenceInput
            label="????????????"
            source="vendorId"
            reference="users"
            validate={required()}
            fullWidth
          >
            <SelectInput
              source="name"
              optionText="name"
              validate={required()}
            />
          </ReferenceInput>
          <TextInput
            multiline
            fullWidth
            rows={5}
            source="description"
            label="?????? ????????????"
            validate={required()}
          />
        </FormTab>
        <FormTab label="?????????????? ????????????????????" path="category-brands">
          <ReferenceInput
            label="??????????"
            source="categoryId"
            reference="categories"
            validate={required()}
          >
            <SelectInput source="name" optionText="name" required />
          </ReferenceInput>
          <ReferenceInput
            label="??????????????"
            source="brandId"
            reference="brands"
            validate={required()}
          >
            <SelectInput
              source="name"
              optionText="name"
              validate={required()}
            />
          </ReferenceInput>
        </FormTab>
        <FormTab label="?????? ????????????" path="photos">
          {/*<Image source="photos" />*/}
          <ImageInput
            source="thumb"
            onChange={changeThumb}
            label="???????? ???????????? ????????????????"
            accept="image/*"
            placeholder={<p>?????????? ?????? ???????? ???????????? ???????????????? ??????</p>}
            validate={required()}
          >
            <ImageField source="" />
          </ImageInput>
          <ImageInput
            source="photos"
            onChange={changePhoto}
            label="?????? ????????????"
            accept="image/*"
            placeholder={<p>?????????? ?????? ?????? ????????????</p>}
            multiple
          >
            <ImageField source="" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Create>
  )
}
