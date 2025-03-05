import PDFDocument from "pdfkit";
import moment from "moment";

export const generateReport = async (req, res) => {
  try {
    // Se pueden recibir parámetros para personalizar el informe
    // const { currency, startDate, endDate } = req.query;
    // Por ahora se usa datos dummy

    const currency = req.query.currency || "USD";
    const predictionSummary =
      "La predicción indica un incremento moderado en el precio en los próximos días.";
    const historicalData =
      "Datos históricos: apertura 1.2, cierre 1.3, máximo 1.35, mínimo 1.15.";
    const predictionModel =
      "Modelo ARIMA aplicado para el análisis de series temporales.";
    const trendGraphInfo =
      "Gráficos de tendencias y comparativa generados con base en datos reales.";
    const recommendations =
      "Se recomienda monitorear el mercado para aprovechar posibles oportunidades.";

    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Encabezados
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report_${currency}_${moment().format(
        "YYYYMMDD"
      )}.pdf`
    );

    // Canaliza la salida del PDF directamente a la respuesta
    doc.pipe(res);

    // Título
    doc
      .fontSize(26)
      .fillColor("#007BFF")
      .text("Informe de Predicción de Divisa", { align: "center" });
    doc.moveDown(2);

    // Resumen de la predicción
    doc
      .fontSize(18)
      .fillColor("#000000")
      .text("Resumen de la predicción:", { underline: true });
    doc.fontSize(14).fillColor("#333333").text(predictionSummary);
    doc.moveDown(1.5);

    // Datos históricos utilizados
    doc
      .fontSize(18)
      .fillColor("#000000")
      .text("Datos históricos utilizados:", { underline: true });
    doc.fontSize(14).fillColor("#333333").text(historicalData);
    doc.moveDown(1.5);

    // Modelo de predicción aplicado
    doc
      .fontSize(18)
      .fillColor("#000000")
      .text("Modelo de predicción aplicado:", { underline: true });
    doc.fontSize(14).fillColor("#333333").text(predictionModel);
    doc.moveDown(1.5);

    // Gráficos de tendencias y comparación
    doc
      .fontSize(18)
      .fillColor("#000000")
      .text("Gráficos de tendencias y comparación:", { underline: true });
    doc.fontSize(14).fillColor("#333333").text(trendGraphInfo);
    doc.moveDown(1.5);

    // Recomendaciones o insights clave
    doc
      .fontSize(18)
      .fillColor("#000000")
      .text("Recomendaciones o insights clave:", { underline: true });
    doc.fontSize(14).fillColor("#333333").text(recommendations);
    doc.moveDown(1.5);

    // Sección de interpretación
    doc
      .fontSize(18)
      .fillColor("#000000")
      .text("Interpretación:", { underline: true });
    doc
      .fontSize(14)
      .fillColor("#333333")
      .text(
        "La predicción se basa en un análisis estadístico robusto y modelos de machine learning, lo que le confiere un nivel de confianza adecuado para la toma de decisiones. Se recomienda complementar este análisis con información del mercado."
      );
    doc.moveDown(2);

    // Pie de página
    doc
      .fontSize(12)
      .fillColor("#888888")
      .text(
        `Informe generado el ${moment().format(
          "DD/MM/YYYY"
        )} a las ${moment().format("HH:mm:ss")}`,
        { align: "center" }
      );

    // Finaliza el documento
    doc.end();
  } catch (error) {
    console.error("Error generando el informe:", error);
    res.status(500).json({ message: "Error al generar el informe." });
  }
};
