import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Select, Checkbox, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const Protocol = {
  Http: "http",
  Https: "https",
};

const DomainForm: React.FC = forwardRef((props, ref) => {

  const [form] = Form.useForm();
  const [protocol, setProtocol] = useState<string>(Protocol.Http);

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item 
        label="域名" 
        required 
        name='name' 
        tooltip="支持完整域名（例如：hello.com）或模糊域名（例如：*.hello.com），独立管理该域名的协议及证书，且域名能将路由配置相互隔离"
        rules={[
          {
            required: true,
            message: '支持大小写字母、数字、下划线（_）、短划线（-）和星号（*），不超过256个字符。',
          },
        ]}
      >
        <Input
          showCount
          allowClear
          maxLength={256} 
          placeholder="支持大小写字母、数字、下划线（_）、短划线（-）和星号（*），不超过256个字符。" 
        />
      </Form.Item>
      <Form.Item 
        label="协议" 
        required
        name='protocol'
        tooltip="目前支持HTTP（80端口）和HTTPS（443端口）协议，HTTPS协议必须关联SSL证书"
      >
        <Select 
          allowClear
          placeholder="请选择协议"
          onChange={(v) => setProtocol(v)}
        >
          <Option value="http">HTTP</Option>
          <Option value="https">HTTPS</Option>
        </Select>
      </Form.Item>
      {
        protocol === Protocol.Https ? (
          <div>
            <Form.Item 
              label="证书" 
              required
              name='certIdentifier'
              tooltip="目前支持阿里云SSL证书服务上的证书"
            >
              <Select 
                allowClear
                placeholder="请选择证书"
                options={[]}
              />
            </Form.Item>
            <Form.Item 
              name='mustHttps'
              tooltip="目前支持阿里云SSL证书服务上的证书"
            >
              <Checkbox.Group 
                options={[
                  {
                    label: (
                      <>
                        <span style={{ marginRight: 4 }}>是否强制Https</span>
                        <Tooltip title="只生效 HTTPS（443端口），HTTP（80端口）访问将被重定向至 HTTPS（443端口）">
                          <QuestionCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)'}}/>
                        </Tooltip>
                      </>
                    ),
                    value: true
                  }
                ]}
              />
            </Form.Item>
          </div>
        ) : null 
      }
    </Form>
  );
});

export default DomainForm;