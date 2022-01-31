import {
  AutocompleteInput,
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useMutation,
  SaveButton,
  Toolbar,
} from "react-admin"
import * as React from "react"
import { useCallback } from "react"

const PostCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      submitOnEnter={true}
      transform={(data) => {
        return {
          ...data,
          product: { id: data.productId },
          variant: { id: data.variantId },
        }
      }}
    />
  </Toolbar>
)

export const VariantEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<PostCreateToolbar />}>
        <TextInput source="name" fullWidth />

        <ReferenceInput
          source="productId"
          reference="products"
          filterToQuery={(searchText) => ({
            productName: searchText,
          })}
          validate={required()}
          fullWidth
        >
          <AutocompleteInput optionText="productName" />
        </ReferenceInput>
        <ReferenceInput
          source="variantId"
          reference="variants"
          filterToQuery={(searchText) => ({
            name: searchText,
          })}
          validate={required()}
          fullWidth
        >
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}
