import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ImageItem, RootStackParamList } from '../types/common'
import {
  Button,
  View,
  Pressable,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GlobalClassName } from 'src/styles/global.styles'
import { useAtom } from 'jotai'
import { themeAtom } from 'src/store/themeStore'
import { ThemeSwitcher } from 'src/components/common'
import { Button as PaperButton } from 'react-native-paper'
import { useState } from 'react'
import axios from 'axios'

const Details = ({ route }: any) => {
  console.log(route.params)
  type homeScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'Details'
  >
  const navigation = useNavigation<homeScreenProps>()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const apiUrl = 'http://dev3.xicom.us/xttest/getdata.php'
      const formData = new FormData()
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('email', email)
      formData.append('phone', phone)

      // Assuming route.params.data is the correct reference to your image file or data
      formData.append('user_image', route.params.data)

      const response = await axios.post(apiUrl, formData, config)
      console.log(response)
    } catch (error: any) {
      console.error('Error fetching images:', error?.message)
    }
  }

  return (
    <View className={`flex-1 p-6 mt-10`}>
      <ScrollView>
        <Image
          source={{ uri: route.params.data }}
          className="w-full h-[200px]"
        />
        {/* firstname */}
        <View className="p-6 ">
          <View className="flex-row items-center mt-4">
            <Text className="w-[40%]">First Name : </Text>
            <TextInput
              className="border-2  p-1 w-[60%]"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text)
              }}
            />
          </View>
          {/* lastName */}
          <View className="flex-row items-center mt-4">
            <Text className="w-[40%]">last Name : </Text>
            <TextInput
              className="border-2 w-[60%] p-1"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text)
              }}
            />
          </View>
          {/* email */}
          <View className="flex-row items-center mt-4">
            <Text className="w-[40%]">Email : </Text>
            <TextInput
              className="border-2 w-[60%] p-1"
              value={email}
              onChangeText={(text) => {
                setEmail(text)
              }}
            />
          </View>
          {/* Phone */}
          <View className="flex-row items-center mt-4">
            <Text className="w-[40%]">Phone : </Text>
            <TextInput
              className="border-2 w-[60%] p-1"
              value={phone}
              onChangeText={(text) => {
                setPhone(text)
              }}
            />
          </View>
          {/* submit */}
          <View className="flex-row items-center mt-4">
            <Text className="w-[40%]"> </Text>
            <Pressable
              onPress={handleSubmit}
              className="border-2 w-[60%] p-1 justify-center items-center rounded-[6px] "
            >
              <Text>Submit</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default Details
