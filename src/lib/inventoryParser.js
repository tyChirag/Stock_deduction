/**
 * Cleans common OCR mistakes from text.
 */
function cleanOcrText(text) {
  if (!text) return '';
  return text
    .replace(/[0oO]\s*[0oO]/ig, '00') // Fix double zeros
    .replace(/l1/ig, 'll') // Fix ll misread as l1
    .replace(/[^\w\s\-\:]/g, '') // Remove weird symbols
    .trim();
}

/**
 * Parses raw OCR text into an array of product objects with confidence scores,
 * and merges duplicate items automatically.
 * 
 * @param {string} rawText - The raw text output from Tesseract
 * @returns {Array} - Array of { product, quantity, confidence, originalLine }
 */
export function parseAndMergeInventory(rawText) {
  const lines = rawText.split('\n');
  const parsedItems = [];
  const mergedMap = new Map();

  // 1. Strict Match: "Product Name - 10"
  const regex = /^([a-zA-Z0-9\s]+?)\s*[-:=_xX]?\s*(\d+)$/;
  // 2. Strict Reverse: "10 - Product Name"
  const reverseRegex = /^(\d+)\s*[-:=_xX]?\s*([a-zA-Z0-9\s]+?)$/;
  // 3. Loose Fallback: any words followed by a number anywhere on the line
  const looseRegex = /([a-zA-Z]{3,}[\w\s]*?)\s*[-:=_xX]?\s*(\d+)/;

  lines.forEach(line => {
    let cleanLine = line.trim();
    if (!cleanLine || cleanLine.length < 3) return;

    let productName = '';
    let quantity = 0;
    let confidence = 'Low';

    const match1 = cleanLine.match(regex);
    const match2 = cleanLine.match(reverseRegex);
    const match3 = cleanLine.match(looseRegex);

    if (match1) {
      productName = cleanOcrText(match1[1]);
      quantity = parseInt(match1[2], 10);
      confidence = 'High';
    } else if (match2) {
      quantity = parseInt(match2[1], 10);
      productName = cleanOcrText(match2[2]);
      confidence = 'Medium';
    } else if (match3) {
      productName = cleanOcrText(match3[1]);
      quantity = parseInt(match3[2], 10);
      confidence = 'Low';
    } else {
      // Attempt very aggressive parsing for Low confidence
      const numbers = cleanLine.match(/\d+/g);
      const words = cleanLine.match(/[a-zA-Z]{3,}/g);
      
      if (numbers && words) {
        quantity = parseInt(numbers[numbers.length - 1], 10);
        productName = cleanOcrText(words.join(' '));
        confidence = 'Low';
      }
    }

    if (productName && quantity > 0) {
      // Normalize product name for deduplication (lowercase, trim whitespace)
      const normalizedKey = productName.toLowerCase().replace(/\s+/g, ' ').trim();
      
      if (mergedMap.has(normalizedKey)) {
        // Merge duplicates
        const existing = mergedMap.get(normalizedKey);
        existing.quantity += quantity;
        // Upgrade confidence if a duplicate was found and successfully merged
        if (existing.confidence === 'Low' && confidence !== 'Low') {
          existing.confidence = confidence;
        }
        existing.isMerged = true;
      } else {
        mergedMap.set(normalizedKey, {
          product: productName, // Keep original casing
          quantity: quantity,
          confidence: confidence,
          originalLine: cleanLine,
          isMerged: false,
          category: 'Uncategorized',
          price: 0
        });
      }
    }
  });

  return Array.from(mergedMap.values());
}
