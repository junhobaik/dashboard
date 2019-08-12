import gql from "graphql-tag";

export const HOME_PAGE = gql`
  {
    user(id: 1) {
      name
    }
  }
`;
