import React from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";

export default function DashboardAvatars() {
  return (
    <AvatarGroup isBordered max={3} total={10}>
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        style={{ width: "30px", height: "30px" }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        style={{ width: "30px", height: "30px" }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        style={{ width: "30px", height: "30px" }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        style={{ width: "30px", height: "30px" }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        style={{ width: "30px", height: "30px" }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        style={{ width: "30px", height: "30px" }}
      />
    </AvatarGroup>
  );
}
