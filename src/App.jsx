import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import "./App.css";
import PdfDocument from "./components/generateInvoice/Invoice";
import InvoiceData from "./jsonData/InvoiceData";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const fileName = "diffe-rent-.pdf";
  const [state, setState] = useState({
    rent: false,
    tax: false,
  });

  const clickHandler = (e) => {
    const ide = e.target.id;
    const checked = e.target.checked;
    setState({ ...state, [ide]: checked });
  };

  const PDFDoc = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Title of the page</Text>
          </View>
          <View style={styles.section}>
            <Text>
              {state.rent
                ? "The rent is 300$ per month"
                : "Alternative text (not checked)"}
            </Text>
          </View>
          {state.tax && (
            <View style={styles.section}>
              <Text>
                some text about the tax.. note that when not check there is no
                text
              </Text>
            </View>
          )}
        </Page>
      </Document>
    );
  };

  // console.log(width)
  return (
    <div className="container">
      <div className="options">
        <h3>Dynamic form</h3>
        <p>What would you like to add?</p>
        <div>
          <input
            type="checkbox"
            id="rent"
            name="rent"
            onClick={(e) => clickHandler(e)}
          />
          <label htmlFor="rent">Rent amount</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="tax"
            name="tax"
            onClick={(e) => clickHandler(e)}
          />
          <label htmlFor="tax">Tax issues</label>
        </div>
        <div className="download-link">
          <PDFDownloadLink document={<PDFDoc />} fileName={fileName}>
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>

          {/* <PDFDownloadLink document={<PDFDoc />} fileName="example.pdf">
            {({ blob, url, loading, error }) => (
              <a href={url} target="_blank">
                Download my PDF!
              </a>
            )}
          </PDFDownloadLink> */}
        </div>
      </div>
      <div className="display">
        <PDFViewer
          width={width < 900 ? width : 900}
          height={600}
          showToolbar={false}
        >
          <PDFDoc />
        </PDFViewer>
      </div>
    </div>
  );
}

export default App;
