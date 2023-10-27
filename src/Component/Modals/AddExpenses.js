import { Modal } from "antd";
import React from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";

function AddExpenses({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        title="Add Expense"
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expense");
            form.resetFields();
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name of the transaction!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please input the expense amount!" },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              { required: true, message: "Please select the expense date!" },
            ]}
          >
            <DatePicker className="custom-input" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="tag"
            style={{ fontWeight: 600 }}
            rules={[{ required: true, message: "Please select a tag!" }]}
          >
            <Select placeholder="Expenses">
              <Select.Option value="food" defaultValue>
                Food
              </Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="office">Office</Select.Option>
              <Select.Option value="other">Other</Select.Option>
              {/* Add more tags here */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-[var(--blue)]"
              type="primary"
              htmlType="submit"
            >
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddExpenses;
