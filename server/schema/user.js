import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!] # user resolver
    user: User # user resolver
  }

  type User {
    _id: String
    googleId: String
    name: String
    picture: String
    feedList: [feedListItem] # user schema
  }

  type feedListItem {
    _id: String
    feedId: String
    title: String
    link: String # user resolver
    category: String
    readedItem: [String]
    items: [feedItems] # user resolver
    isHideItems: Boolean
  }

  extend type Mutation {
    changeCategoryName(oldCategoryName: String, newCategoryName: String): response
    changeFeedCategory(feedId: String, category: String): response
    deleteCategory(category: String): response
    changeFeedTitle(feedId: String, title: String): response
  }
`;
