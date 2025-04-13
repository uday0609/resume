import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import ResultReport from './ResultReport';

const Resultpdf = ({ extraData }) => {

  // Styles for the PDF
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },
    section: {
      marginBottom: 20,
    },
    text: {
        fontSize: 12,
        margin: 10,
      },
  });

  return (
    <>
    <Document>
      <Page  size="A4" style={styles.page}>
        {/* <View style={styles.section}>
          <Text tyle={styles.text}>Extra Data: {extraData}</Text>
        </View> */}
        <div>
             <strong>Company:</strong> {extraData.companyName}
        </div>
        <div>
             <strong>Address:</strong> {extraData.address}
         </div>
         <div>
             <strong>email:</strong> {extraData.email}
         </div>
        {/* Existing page content from your React app */}
        <ResultReport/>
      </Page>
    </Document>
     
    </>
  );
};
export default  Resultpdf;