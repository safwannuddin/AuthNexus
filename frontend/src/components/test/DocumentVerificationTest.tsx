import React, { useState } from 'react';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Option } = Select;

const DocumentVerificationTest: React.FC = () => {
  const [documentType, setDocumentType] = useState<string>('passport');
  const [file, setFile] = useState<File | null>(null);
  const { verifyDocument, isVerifying } = useDocumentStore();

  const handleVerify = async () => {
    if (!file) {
      message.error('Please select a file first');
      return;
    }

    try {
      const result = await verifyDocument(file, documentType);
      message.success('Verification completed! Check the results below.');
      console.log('Verification Result:', result);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      message.error('Verification failed: ' + errorMessage);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Document Verification Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Document Type:</label>
          <Select
            value={documentType}
            onChange={setDocumentType}
            className="w-full"
          >
            <Option value="passport">Passport</Option>
            <Option value="national_id">National ID</Option>
            <Option value="drivers_license">Driver's License</Option>
            <Option value="id_card">ID Card</Option>
            <Option value="custom">Custom Document</Option>
          </Select>
        </div>

        <div>
          <label className="block mb-2">Upload Document:</label>
          <Upload
            beforeUpload={(file: File) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </div>

        <Button
          type="primary"
          onClick={handleVerify}
          loading={isVerifying}
          disabled={!file}
        >
          Verify Document
        </Button>
      </div>
    </div>
  );
};

export default DocumentVerificationTest; 