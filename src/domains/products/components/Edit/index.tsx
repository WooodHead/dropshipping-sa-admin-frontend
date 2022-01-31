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
} from "react-admin"
import RichTextInput from "ra-input-rich-text"

import { Photo, Product } from "../../../../types"
import Avatar from "@material-ui/core/Avatar"
import { Close } from "@material-ui/icons"
import Axios from "axios"
import { API_URL } from "../../../../config/constants"

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
      form.append("productId", String(record.externalId))
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
    files.map(async (file) => {
      if (file instanceof File) {
        return uploadImage(file)
      }
    })
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
        label="Related pictures"
        accept="image/*"
        placeholder={<p>Drop your file here</p>}
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
        <FormTab label="Details">
          <ImageInput
            source=""
            onChange={changeThumb}
            label="Thumbnail"
            accept="image/*"
          >
            <ImageField source="productPicture" title="title" />
          </ImageInput>

          <TextInput source="productName" fullWidth multiline />
          <NumberInput source="productPrice" fullWidth />
          <BooleanInput source="isDeleted" />
          <TextInput multiline fullWidth source="productDescription" />
        </FormTab>
        <FormTab label="Photos" path="photos">
          <Image source="photos" />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}
