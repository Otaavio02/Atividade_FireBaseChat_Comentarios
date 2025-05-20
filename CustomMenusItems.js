import { Text, View } from 'react-native';
import {
    MenuOption,
  } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Importações necessárias

// Define e exporta o componente funcional MenuItem
export const MenuItem = ({text, action, value, icon})=>{
    return (
       // Quando selecionado, executa a função `action` passando `value` como argumento
        <MenuOption onSelect={()=> action(value)}>
      //Estiliza a opção com padding e layout horizontal, com espaçamento entre texto e ícone
            <View className="px-4 py-1 flex-row justify-between items-center">
      //Texto da opção com estilo responsivo e cor neutra
                <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-600">
                    {text}
                </Text>
   //Icone se for fornecido aparece no lado esquerdo
                {icon}
            </View>
        </MenuOption>
    )
}
