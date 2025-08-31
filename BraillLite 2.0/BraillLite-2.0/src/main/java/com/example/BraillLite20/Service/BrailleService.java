package com.example.BraillLite20.Service;

import com.example.BraillLite20.Utils.BrailleConverter;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class BrailleService {

    public String processFileToBraille(MultipartFile file) {
        try {
            String originalText;

            String fileName = file.getOriginalFilename();
            if (fileName == null) throw new IllegalArgumentException("File name is null");

            if (fileName.endsWith(".txt")) {
                originalText = new String(file.getBytes());
            } else if (fileName.endsWith(".pdf")) {
                originalText = extractTextFromPdf(file);
                if (originalText.trim().isEmpty()) {
                    originalText = extractTextUsingOCR(file);
                }
            } else {
                throw new IllegalArgumentException("Unsupported file type");
            }

            return BrailleConverter.toBraille(originalText);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing file: " + e.getMessage();
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String extractTextUsingOCR(MultipartFile file) throws Exception {
        File tempFile = File.createTempFile("ocr-", ".pdf");
        file.transferTo(tempFile);

        try (PDDocument document = PDDocument.load(tempFile)) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            ITesseract tesseract = new Tesseract();
            tesseract.setLanguage("eng");

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < document.getNumberOfPages(); i++) {
                BufferedImage bim = pdfRenderer.renderImageWithDPI(i, 300);
                String result = tesseract.doOCR(bim);
                sb.append(result);
            }

            return sb.toString();
        } finally {
            tempFile.delete();
        }
    }

}
