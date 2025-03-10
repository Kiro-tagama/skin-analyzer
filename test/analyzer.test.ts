import {analizerIA} from "@/app/analyzer/analizerIA"
import { mappingIAs } from "@/assets/IAModels/mappingIAs";

const info = [
  ['ISIC_0713136','Malignant'],
  ['ISIC_1225585','Benign'],
  ['ISIC_2509654','Benign'],
  ['ISIC_5730927','Malignant'],
  ['ISIC_6671739','Benign'],
  ['ISIC_7650956','Malignant'],
]
const path = (img:string)=>`test/ISIC-images/${img}.jpg`

describe('Analizer', async () => {
  for (let index = 0; index < info.length; index++) {
    const imgPath = path(info[index][0])
    const expected = info[index][1]

    console.log(await analizerIA(imgPath,mappingIAs[0].model))
    console.log("esperado: "+ expected)
  }
});
