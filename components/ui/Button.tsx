import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title?: string;          // O título que será mostrado no botão (opcional)
  onPress: () => void;     // Função chamada quando o botão é pressionado
  children?: React.ReactNode; // Elementos filhos para serem renderizados dentro do botão
};

export function Button({ title, onPress, children }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children ? (
        children // Exibe o elemento filho se presente
      ) : (
        <Text style={styles.buttonText}>{title}</Text> // Caso contrário, exibe o título
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,            // Adiciona o contorno
    borderColor: '#000',       // Cor do contorno (mesma cor do texto)
    paddingVertical: 10,       // Espaçamento vertical
    paddingHorizontal: 20,     // Espaçamento horizontal
    borderRadius: 5,           // Arredondamento nas bordas
    alignItems: 'center',      // Centraliza o conteúdo
    justifyContent: 'center',  // Centraliza o conteúdo
  },
  buttonText: {
    color: '#000',             // Cor do texto (igual ao contorno)
    fontSize: 16,              // Tamanho da fonte
  },
});
