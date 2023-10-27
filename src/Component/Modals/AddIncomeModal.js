import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import "./styles.css";

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        title="Add Income"
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "income");
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
              { required: true, message: "Please input the income amount!" },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              { required: true, message: "Please select the income date!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Tag"
            name="tag"
            rules={[{ required: true, message: "Please select a tag!" }]}
          >
            <Select placeholder="Income Source">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
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
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddIncomeModal;
