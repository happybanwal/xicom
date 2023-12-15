import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { RootStackParamList } from 'src/types/common'

interface ImageItem {
  xt_image: string
  id: string
}

const Login = () => {
  type loginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>
  const navigation = useNavigation<loginScreenProps>()

  const [data, setData] = useState<ImageItem[]>([])
  const [offset, setOffset] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchData = async () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const apiUrl = 'http://dev3.xicom.us/xttest/getdata.php'
    const formData = new FormData()
    formData.append('user_id', '108')
    formData.append('offset', String(offset))
    formData.append('type', 'popular')

    try {
      const res = await axios.post(apiUrl, formData, config)
      console.log({ length: res?.data?.images?.length })
      const newData: ImageItem[] = res.data.images
      setData((prevData) => [...prevData, ...newData])
      setData(res?.data?.images)
    } catch (error: any) {
      console.error('Error fetching images:', error?.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [offset])

  const renderImageItem: React.FC<{ item: ImageItem }> = useCallback(
    ({ item }) => (
      <Image
        source={{ uri: item.xt_image }}
        style={{ width: '100%', height: 200 }}
      />
    ),
    []
  )

  const itemSeperator = useCallback(() => {
    return <View style={{ height: 20 }}></View>
  }, [])

  const loadMoreImages = () => {
    if (offset < 3) {
      setOffset((prevOffset) => prevOffset + 1)
    }
  }

  return (
    <View className="flex-1 mt-10 p-6">
      <View className="flex-1">
        <FlatList
          data={data}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          // keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeperator}
          //   onEndReached={endReached}
          onEndReached={loadMoreImages}
        />

        <TouchableOpacity
          onPress={loadMoreImages}
          style={{ padding: 10, backgroundColor: 'gray' }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Click here to load more
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Login
