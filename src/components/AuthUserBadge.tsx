import { Dropdown, Button, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

type PropType = {
  className?: string;
  logout: () => void;
  userName: string;
};

export const AuthUserBadge = (props: PropType) => {
  const { className, logout, userName } = props;

  return (
    <Dropdown.Button
      className={className}
      overlay={
        <Space>
          <Typography.Title level={5}>{userName}</Typography.Title>
          <Typography.Text>You are logged in</Typography.Text>
          <Button onClick={logout}>Log out</Button>
        </Space>
      }
      placement="bottom"
      icon={<UserOutlined />}
    >
      {userName.split(" ")[0]}
    </Dropdown.Button>
  );
};
