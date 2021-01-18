import React,{useEffect} from 'react';
import { Modal, Form, Input, Select} from 'antd';
import propTypes from 'prop-types'
const { Option } = Select;

const AddModal = ({ visible, onCreate, onCancel, data, reqId }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      form.setFieldsValue({parentId: reqId});
  }, [visible,reqId,form])
  return (
    <Modal
	  getContainer={false}
      visible={visible}
      title="添加分类"
      okText="确认提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
			//让index中的添加函数执行
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
	    id='addCategoryForm'
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          parentId: reqId,
        }}
      >
        <Form.Item
          name="parentId"
        >
			<Select
			>
			  <Option value="0">一级分类</Option>
			  {data.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)}
			</Select>
        </Form.Item>
        <Form.Item name="categoryName" 
		 rules={[{ 
			 required: true,
			 message: '请填写分类!'
		 }]}>
          <Input id='addCategoryInput' type="textarea" placeholder="新增分类"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddModal.propTypes = {
    visible: propTypes.bool.isRequired,
    onCreate: propTypes.func.isRequired,
	onCancel: propTypes.func.isRequired,
	data: propTypes.array.isRequired,
	reqId: propTypes.string.isRequired,
};
export default AddModal