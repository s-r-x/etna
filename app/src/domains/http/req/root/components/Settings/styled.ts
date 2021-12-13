import styled from "styled-components";
import { Form as BaseForm } from "antd";

export const Form = styled(BaseForm)`
  .ant-form-item {
    flex-wrap: nowrap !important;
  }
  @media (max-width: 575px) {
    .ant-form-item-label {
      flex: none !important;
      margin-right: 10px;
    }
  }
`;
