import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'
//Importações necessárias

//Define e exporta o componente ChatList
export default function ChatList({users, currentUser}) {
    const router = useRouter();
  return (
//Container principal que ocupa toda a tela
    <View className="flex-1">
    //FlatList para para exibir listas longas
      <FlatList
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
        keyExtractor={item=> Math.random()}
// Remove a barra de scroll vertical
        showsVerticalScrollIndicator={false}
 // Função para renderizar cada item da lista
        renderItem={({item, index})=> <ChatItem 
            noBorder={index+1 == users.length} 
            router={router} 
            currentUser={currentUser}
            item={item} 
            index={index} 
        />}
       />
    </View>
  )
}
