import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';

interface TableRow {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

const InvoicePage: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('YourCompanyName');
  const [companyAddress, setCompanyAddress] = useState<string>('123 Your Street');
  const [companyAddress2, setCompanyAddress2] = useState<string>('Your Town');
  const [companyAddress3, setCompanyAddress3] = useState<string>('Invoice #2334889');
  const [companyAddress4, setCompanyAddress4] = useState<string>('Address Line 3');
  const [companyAddress5, setCompanyAddress5] = useState<string>('(123) 456 789');
  const [companyAddress6, setCompanyAddress6] = useState<string>('email@yourcompany.com');
  const [companyAddress7, setCompanyAddress7] = useState<string>('PO 456001200');
  const [companyAddress8, setCompanyAddress8] = useState<string>('Att: Ms. Jane Doe');
  const [companyAddress9, setCompanyAddress9] = useState<string>('Client Company Name');
  const [companyAddress10, setCompanyAddress10] = useState<string>('Dear Ms. Jane Doe,');
  const [companyAddress11, setCompanyAddress11] = useState<string>('Please find below a cost breakdown for the recent work completed. Please make payment at your earliest.');
  const [companyAddress12, setCompanyAddress12] = useState<string>('Many thanks,');
  const [companyAddress13, setCompanyAddress13] = useState<string>('Your Name');
  const [companyAddress14, setCompanyAddress14] = useState<string>('Many thanks for your custom! I look forward to doing business with you again in due course.');
  const [companyAddress15, setCompanyAddress15] = useState<string>('Payment terms: to be received within 60 days.');

  const [tableData, setTableData] = useState<TableRow[]>([{ description: 'Item 1', quantity: 2, price: 10, total: 20 }]);
  const [subtotal, setSubtotal] = useState<number>(20);
  const [tax, setTax] = useState<number>(2);
  const [total, setTotal] = useState<number>(22);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sub = tableData.reduce((acc, curr) => acc + curr.total, 0);
    const taxAmount = sub * 0.1;
    const totalAmount = sub + taxAmount;
    setSubtotal(sub);
    setTax(taxAmount);
    setTotal(totalAmount);
  }, [tableData]);

  const handleAddRow = () => {
    setTableData([...tableData, { description: 'Item 1', quantity: 1, price: 20, total: 20 }]);
  };

  const handleDeleteRow = (index: number) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newData = [...tableData];
    newData[index].quantity = newQuantity;
    newData[index].total = newQuantity * newData[index].price;
    setTableData(newData);
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    const newData = [...tableData];
    newData[index].price = newPrice;
    newData[index].total = newPrice * newData[index].quantity;
    setTableData(newData);
  };

  const handleDescriptionChange = (index: number, newDescription: string) => {
    const newData = [...tableData];
    newData[index].description = newDescription;
    setTableData(newData);
  };

  const handleGeneratePDF = () => {
    const input = document.getElementById('invoice-content') as HTMLDivElement;
    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgHeight = canvas.height * 208 / canvas.width;
      let position = 0;
      const pageHeight = 297;
      let leftHeight = imgHeight;

      while (leftHeight > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, 208, Math.min(leftHeight, pageHeight));
        leftHeight -= pageHeight;
        position -= 297;
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }

      pdf.save('invoice.pdf');
    });
  };

  const handleSaveOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, setterFunction: (value: string) => void) => {
    if (e.key === 'Enter') {
      setterFunction((e.target as HTMLInputElement).value);
    }
  };

  const handleTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, setterFunction: (value: string) => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
      setterFunction(target.value);
    }
  };

  return (

   
    <div className="container mx-auto mt-20 mb-10 p-8 bg-white shadow-md rounded" ref={contentRef} id="invoice-content">
    
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        onKeyDown={(e) => handleSaveOnEnter(e, setCompanyName)}
        className="text-center text-2xl font-bold w-full border-none outline-none bg-transparent mb-4"
      />
      
      <div className="flex justify-between mb-8">
        <div className="flex-1">
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress)}
            className="w-full border-none outline-none bg-transparent mb-1"
          />
          <input
            type="text"
            value={companyAddress2}
            onChange={(e) => setCompanyAddress2(e.target.value)}
            onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress2)}
            className="w-full border-none outline-none bg-transparent mb-1"
          />
          <input
            type="text"
            value={companyAddress4}
            onChange={(e) => setCompanyAddress4(e.target.value)}
            onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress4)}
            className="w-full border-none outline-none bg-transparent mb-4"
          />
          <input
            type="text"
            value={companyAddress5}
            onChange={(e) => setCompanyAddress5(e.target.value)}
            onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress5)}
            className="w-full border-none outline-none bg-transparent mb-1"
          />
          <input
            type="text"
            value={companyAddress6}
            onChange={(e) => setCompanyAddress6(e.target.value)}
            onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress6)}
            className="w-full border-none outline-none bg-transparent mb-4"
          />
        </div>
        <div className="flex-1 text-right">
  <div className="flex flex-col items-end">
    <input
      type="text"
      value={companyAddress3}
      onChange={(e) => setCompanyAddress3(e.target.value)}
      onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress3)}
      className="w-full border-none outline-none bg-transparent mb-1 text-right" // Ensure text-right for alignment
    />
    <input
      type="text"
      value={companyAddress7}
      onChange={(e) => setCompanyAddress7(e.target.value)}
      onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress7)}
      className="w-full border-none outline-none bg-transparent mb-4 text-right" // Ensure text-right for alignment
    />
    <input
      type="text"
      value={companyAddress8}
      onChange={(e) => setCompanyAddress8(e.target.value)}
      onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress8)}
      className="w-full border-none outline-none bg-transparent mb-1 text-right" // Ensure text-right for alignment
    />
    <input
      type="text"
      value={companyAddress9}
      onChange={(e) => setCompanyAddress9(e.target.value)}
      onKeyDown={(e) => handleSaveOnEnter(e, setCompanyAddress9)}
      className="w-full border-none outline-none bg-transparent mb-4 text-right" // Ensure text-right for alignment
    />
  </div>
</div>

      </div>

      <textarea
        value={companyAddress10}
        onChange={(e) => setCompanyAddress10(e.target.value)}
        onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress10)}
        className="w-full border-none outline-none bg-transparent mb-4 resize-none"
        rows={2}
      />
      <textarea
        value={companyAddress11}
        onChange={(e) => setCompanyAddress11(e.target.value)}
        onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress11)}
        className="w-full border-none outline-none bg-transparent mb-4 resize-none"
        rows={2}
      />
      <textarea
        value={companyAddress12}
        onChange={(e) => setCompanyAddress12(e.target.value)}
        onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress12)}
        className="w-full border-none outline-none bg-transparent mb-4 resize-none"
        rows={2}
      />
      <textarea
        value={companyAddress13}
        onChange={(e) => setCompanyAddress13(e.target.value)}
        onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress13)}
        className="w-full border-none outline-none bg-transparent mb-4 resize-none"
        rows={2}
      />

      <table className="min-w-full bg-white mb-8 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border border-gray-300 text-left">Description</th>
            <th className="py-2 px-4 border border-gray-300 text-right">Quantity</th>
            <th className="py-2 px-4 border border-gray-300 text-right">Price</th>
            <th className="py-2 px-4 border border-gray-300 text-right">Total</th>
            <th className="py-2 px-4 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  onKeyDown={(e) => handleSaveOnEnter(e, () => handleDescriptionChange(index, e.target.value))}
                  className="w-full border-none outline-none bg-transparent"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  onKeyDown={(e) => handleSaveOnEnter(e, () => handleQuantityChange(index, parseInt(e.target.value)))}
                  className="w-full border-none outline-none bg-transparent text-right"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                <input
                  type="number"
                  value={row.price}
                  onChange={(e) => handlePriceChange(index, parseInt(e.target.value))}
                  onKeyDown={(e) => handleSaveOnEnter(e, () => handlePriceChange(index, parseInt(e.target.value)))}
                  className="w-full border-none outline-none bg-transparent text-right"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">{row.total}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button onClick={() => handleDeleteRow(index)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
          <tr className="bg-gray-100">
            <td className="border border-gray-300 px-4 py-2 text-right font-bold" colSpan={3}>Subtotal</td>
            <td className="border border-gray-300 px-4 py-2 text-right">{subtotal}</td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 px-4 py-2 text-right font-bold" colSpan={3}>GST Tax (10%)</td>
            <td className="border border-gray-300 px-4 py-2 text-right">{tax}</td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 px-4 py-2 text-right font-bold" colSpan={3}>Total</td>
            <td className="border border-gray-300 px-4 py-2 text-right">{total}</td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>

      <textarea
        value={companyAddress14}
        onChange={(e) => setCompanyAddress14(e.target.value)}
        onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress14)}
        className="w-full border-none outline-none bg-transparent mb-4 resize-none"
        rows={2}
      />
      <textarea
        value={companyAddress15}
        onChange={(e) => setCompanyAddress15(e.target.value)}
        onKeyDown={(e) => handleTextAreaKeyDown(e, setCompanyAddress15)}
        className="w-full border-none outline-none bg-transparent mb-4 resize-none"
        rows={2}
      />

<div className="fixed top-4 right-4 z-10">
<button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2">
  <Link to='/'>LogOut</Link>
</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2" onClick={handleAddRow}>Add Row</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleGeneratePDF}>GET PDF</button>
      </div>

    </div>
    
  );
};

export default InvoicePage;
