/*
# converte modelos

pip install tensorflowjs
tensorflowjs_converter --input_format keras model.h5 tfjs_model

*/

export const mappingIAs = [
  {
    name:"Skin Lesion Analyzer",
    description:"O modelo Skin Lesion Analyzer foi treinado para classificar lesões de pele, incluindo possíveis casos de câncer de pele. Ele utiliza redes neurais profundas (CNNs - Convolutional Neural Networks) para analisar imagens e prever a categoria da lesão com base em um banco de dados médico.\nby: vbookshelf",
    link:"https://www.kaggle.com/code/vbookshelf/skin-lesion-analyzer-tensorflow-js-web-app",
    model:"assets/IAModels/Models/Skin Lesion Analyzer/model.json"
  }
]