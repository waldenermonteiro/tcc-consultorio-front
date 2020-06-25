import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { formatDateBr, formatDateAndHourBr } from '../../boot/masks'
pdfMake.vfs = pdfFonts.pdfMake.vfs
const image = `data:image/png;base64,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`
const printPrescriptionMedicament = consult => {
  const medic = convertToString(consult.employee.name)
  const patient = convertToString(consult.patient.name)
  const observation = convertToString(consult.observation)
  const consultDate = formatDateBr(consult.date_appointment)
  const consultDateAndHour = formatDateAndHourBr(consult.date_appointment)
  const preescriptionMedicaments = consult.prescription_medicaments
  const docDefinition = {
    info: {
      title: consultDate + '_' + patient
    },
    pageMargins: [0, 70, 0, 60],

    header: function (currentPage, pageCount, pageSize) {
      return [
        {
          columns: [
            {
              image: image,
              width: 80,
              height: 55,
              alignment: 'center'
            }
          ],
          margin: [250, 5, 0, 5]
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 1000, y2: 0, lineWidth: 2 }]
        }
      ]
    },
    content: [
      {
        columns: [
          {
            text: 'CNPJ: 99.999.999/9999-99 ',
            width: '70%',
            fontSize: 10
          },
          {
            text: 'FONE: (91) 99999-9999/ 3333-3333 ',
            width: '30%',
            fontSize: 10
          }
        ],
        margin: [10, 0, 10, 0]
      },
      {
        columns: [
          {
            text: 'RUAS DOS AFOGADOS - 222 - 99999999  ',
            width: '70%',
            fontSize: 10
          },
          {
            text: 'CENTRO - ABETETUBA  - PARÁ',
            width: '30%',
            fontSize: 10
          }
        ],
        margin: [10, 0, 10, 5]
      },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 1000, y2: 0, lineWidth: 2 }] },
      {
        columns: [
          {
            text: 'RECEITUÁRIO/PLANTÃO',
            alignment: 'center',
            width: '100%',
            bold: true,
            fontSize: 15
          }
        ],
        margin: [10, 10, 10, 10]
      }
    ],
    footer: function (currentPage, pageCount, pageSize) {
      return [
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 1000, y2: 0, lineWidth: 2 }]
        },
        {
          columns: [
            {
              text: 'Profissional: ___________________________________',
              alignment: 'center',
              width: '100%',
              bold: true,
              fontSize: 15
            }
          ],
          margin: [10, 20, 10, 30]
        }
      ]
    }
  }
  const informationsOfConsult = [
    {
      text1: 'Médico:',
      width1: '9%',
      text2: medic,
      widt2: '90%',
      margin: [50, 10, 10, 0]
    },
    {
      text1: 'Paciente:',
      width1: '10%',
      text2: patient,
      widt2: '90%',
      margin: [50, 0, 10, 0]
    },
    {
      text1: 'Data e hora da consulta:',
      width1: '25%',
      text2: consultDateAndHour,
      widt2: '75%',
      margin: [50, 0, 10, 0]
    },
    {
      text1: 'Observações Gerais: ',
      width1: '22%',
      text2: observation || '',
      widt2: '75%',
      margin: [50, 50, 10, 10]
    }
  ]
  for (const row of informationsOfConsult) {
    docDefinition.content.push({
      columns: [
        {
          text: row.text1,
          alignment: 'left',
          width: row.width1,
          bold: true,
          fontSize: 12
        },
        {
          text: row.text2,
          alignment: 'left',
          width: row.widt2,
          fontSize: 12
        }
      ],
      margin: row.margin
    })
  }
  if (preescriptionMedicaments.medicaments) {
    for (const medicament of preescriptionMedicaments.medicaments) {
      const obj = {
        ul: [
          { text: '- ' + medicament.name + ' ------------------------- ' + medicament.qtd, listType: 'none' },
          { text: medicament.dosage || '', listType: 'none', margin: [5, 0, 0, 0] }
        ],
        margin: [37, 0, 10, 10]
      }
      docDefinition.content.push(obj)
    }
  }

  pdfMake.createPdf(docDefinition).print()
}
const convertToString = string => {
  return JSON.stringify(string)
    .replace('"', '')
    .replace('"', '')
}
export default printPrescriptionMedicament
