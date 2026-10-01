// Route names and the data each route receives. Member 3 owns this file.
import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = { Catalog: undefined };
export type NewStackParamList = { Form: undefined; Review: undefined };
export type RecordsStackParamList = {
  RecordsList: undefined;
  InspectionDetails: { recordId: string }; // the id of the record to show
};
export type RootTabParamList = {
  HomeTab: undefined;
  NewTab: NavigatorScreenParams<NewStackParamList> | undefined;
  RecordsTab: NavigatorScreenParams<RecordsStackParamList> | undefined;
};
