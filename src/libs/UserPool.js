import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-2_l9skqWvhX",
  ClientId: "qvmu73q8b6ruiljtrsmk8aln8",
};

export default new CognitoUserPool(poolData);