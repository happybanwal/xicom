export interface ImageItem {
  xt_image: string
  id: string
}

export type RootStackParamList = {
  Home: undefined
  Settings: undefined
  Login: undefined
  BottomTabNavigator: undefined
  Details: { data: ImageItem[] }
}
