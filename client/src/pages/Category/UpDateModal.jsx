import React,{useEffect} from 'react';
import { Modal, Form, Input} from 'antd';
import propTypes from 'prop-types'

const UpDateModal = ({ visible, onCreate, onCancel, defaultText }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      form.setFieldsValue({categoryName:defaultText});
  }, [visible,defaultText,form])
  return (
    <Modal
	  getContainer={false}
      visible={visible}
      title="修改类名"
      okText="确认提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          categoryName: defaultText,
        }}
      >
        <Form.Item
          name="categoryName"
          rules={[
            {
              required: true,
              message: '请填写品类名称再提交!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpDateModal.propTypes = {
    visible: propTypes.bool.isRequired,
    onCreate: propTypes.func.isRequired,
	onCancel: propTypes.func.isRequired,
	defaultText: propTypes.string,
};
export default UpDateModal