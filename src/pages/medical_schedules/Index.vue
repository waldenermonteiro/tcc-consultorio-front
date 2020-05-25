<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md" style="max-width: 300px">
        <q-input v-model="text" filled type="textarea" />
        <q-btn color="grey" icon="print" @click="saveWork()"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import image from './teste'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  data () {
    return {
      qeditor: '<pre></pre>',
      text: ''
    }
  },
  methods: {
    saveWork () {
      const docDefinition = {
        pageMargins: [0, 70, 0, 60],

        header: function (currentPage, pageCount, pageSize) {
          return [
            {
              columns: [
                {
                  image: image,
                  width: 70,
                  height: 45
                },
                {
                  text: 'Clínica do Arquiteto Juninho',
                  alignment: 'center',
                  width: '75%',
                  bold: true,
                  fontSize: 20
                }
              ],
              margin: [0, 5, 0, 5]
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
                text: 'CNPJ: 00.776.574/0006-60 ',
                width: '63%'
              },
              {
                text: 'FONE: (91) 99999-9999/ 3777-0777 ',
                width: '37%'
              }
            ],
            margin: [10, 0, 10, 0]
          },
          {
            columns: [
              {
                text: 'RUAS DOS AFOGADOS - 222 - 66845111  ',
                width: '63%'
              },
              {
                text: 'CENTRO - ABETETUBA  - PARÁ',
                width: '37%'
              }
            ],
            margin: [10, 0, 10, 10]
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
                  text: 'Data: ____/____/____',
                  alignment: 'left',
                  width: '40%',
                  bold: true,
                  fontSize: 15
                },
                {
                  text: 'Profissional: ___________________________________',
                  alignment: 'center',
                  width: '60%',
                  bold: true,
                  fontSize: 15
                }
              ],
              margin: [10, 20, 10, 30]
            }
          ]
        }
      }
      docDefinition.content.push({ text: this.text, margin: [30, 10, 30, 10] })
      pdfMake.createPdf(docDefinition).open()
    }
  }
}
</script>
