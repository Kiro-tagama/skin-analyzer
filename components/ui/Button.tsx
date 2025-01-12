import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';

type ButtonProps = {
  onPress: () => void;    
  disabled?: boolean;
  children?: React.ReactNode;
};


export function Button({onPress, disabled, children}: ButtonProps) {
  const color = useColorScheme() == "light" ? 
  Colors.light.text : Colors.dark.text;
  
  const isIcon = React.isValidElement(children);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, { borderColor: color }]}>
      {isIcon ? (
        React.cloneElement(children as React.ReactElement<any>, {
          color: color, // Aplica a cor ao ícone
        })
      ) : (
        // Caso contrário, aplica a cor ao texto
        <Text style={[{ color }]}>
          {children ? children : null}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,           
    paddingVertical: 10,       
    paddingHorizontal: 20,     
    borderRadius: 5,          
    alignItems: 'center',     
    justifyContent: 'center', 
  }
});
