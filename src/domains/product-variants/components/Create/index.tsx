import React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  SelectArrayInput,
  AutocompleteInput,
  required,
} from "react-admin"

export const ProductVariantCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
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
    </Create>
  )
}
