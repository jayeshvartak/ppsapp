/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCheque = /* GraphQL */ `
  query GetCheque($id: ID!) {
    getCheque(id: $id) {
      id
      chequeNumber
      chequeDate
      amount
      payee
      imageKey
      createdAt
      updatedAt
    }
  }
`;
export const listCheques = /* GraphQL */ `
  query ListCheques(
    $filter: ModelChequeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCheques(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chequeNumber
        chequeDate
        amount
        payee
        imageKey
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
