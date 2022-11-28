import { FC, memo, useEffect } from 'react';
import { useAppDispatch } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { GroupDetail } from '../components/GroupDetail/GroupDetail';

const data : any = {
  _id: "63789ed25c5e5f9da32beddf",
  name: "Web Devlopment Class",
  image: "https://www.dynamicsteps.com/cart/images/links/r2sports-ranking_667_large.jpg",
  owner_id: "63789d055c5e5f9da32bedd9",
  co_owner_id: [],
  member_id: [],
  createdAt: "2022-11-19T09:16:02.641Z",
  updatedAt: "2022-11-19T09:16:02.641Z"
}

const owner : any = {
      roles: {
          owner: [
              "63787715635663efa6d6f0c3",
              "63789ed25c5e5f9da32beddf",
              "6378a305bcedb2bd4e654e6f",
              "6378b093eb54c7888fb241cd",
              "6381dcf385d73ce877612ddf"
          ],
          co_owner: [],
          member: []
      },
      _id: "63787715635663efa6d6f0c3",
      email: "nambd11102001@gmail.com",
      password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
      firstname: "Nam",
      lastname: "Nguyen",
      yearOfBirth: 2001,
      gender: "male",
      address: "",
      systemRole: "637243de9b9759182547755b",
      createdAt: "2022-11-19T06:26:29.891Z",
      updatedAt: "2022-11-27T08:49:48.968Z",
      avatar: "https://tecostore.vn/assets/img/avatar-author.png",
      isActivated: true
}

const coOwners : any[] = [
  {
    roles: {
        owner: [
            "63787715635663efa6d6f0c3",
            "63789ed25c5e5f9da32beddf",
            "6378a305bcedb2bd4e654e6f",
            "6378b093eb54c7888fb241cd",
            "6381dcf385d73ce877612ddf"
        ],
        co_owner: [],
        member: []
    },
    _id: "63787715635663efa6d6f0c3",
    email: "nambd11102001@gmail.com",
    password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
    firstname: "Nam",
    lastname: "Nguyen",
    yearOfBirth: 2001,
    gender: "male",
    address: "",
    systemRole: "637243de9b9759182547755b",
    createdAt: "2022-11-19T06:26:29.891Z",
    updatedAt: "2022-11-27T08:49:48.968Z",
    avatar: "https://tecostore.vn/assets/img/avatar-author.png",
    isActivated: true
},
{
  roles: {
      owner: [
          "63787715635663efa6d6f0c3",
          "63789ed25c5e5f9da32beddf",
          "6378a305bcedb2bd4e654e6f",
          "6378b093eb54c7888fb241cd",
          "6381dcf385d73ce877612ddf"
      ],
      co_owner: [],
      member: []
  },
  _id: "63787715635663efa6d6f0c3",
  email: "nambd11102001@gmail.com",
  password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
  firstname: "Nam",
  lastname: "Nguyen",
  yearOfBirth: 2001,
  gender: "male",
  address: "",
  systemRole: "637243de9b9759182547755b",
  createdAt: "2022-11-19T06:26:29.891Z",
  updatedAt: "2022-11-27T08:49:48.968Z",
  avatar: "https://tecostore.vn/assets/img/avatar-author.png",
  isActivated: true
},
{
  roles: {
      owner: [
          "63787715635663efa6d6f0c3",
          "63789ed25c5e5f9da32beddf",
          "6378a305bcedb2bd4e654e6f",
          "6378b093eb54c7888fb241cd",
          "6381dcf385d73ce877612ddf"
      ],
      co_owner: [],
      member: []
  },
  _id: "63787715635663efa6d6f0c3",
  email: "nambd11102001@gmail.com",
  password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
  firstname: "Nam",
  lastname: "Nguyen",
  yearOfBirth: 2001,
  gender: "male",
  address: "",
  systemRole: "637243de9b9759182547755b",
  createdAt: "2022-11-19T06:26:29.891Z",
  updatedAt: "2022-11-27T08:49:48.968Z",
  avatar: "https://tecostore.vn/assets/img/avatar-author.png",
  isActivated: true
}
]

const members : any[] = [
  {
    roles: {
        owner: [
            "63787715635663efa6d6f0c3",
            "63789ed25c5e5f9da32beddf",
            "6378a305bcedb2bd4e654e6f",
            "6378b093eb54c7888fb241cd",
            "6381dcf385d73ce877612ddf"
        ],
        co_owner: [],
        member: []
    },
    _id: "1",
    email: "nambd11102001@gmail.com",
    password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
    firstname: "Nam",
    lastname: "Nguyen",
    yearOfBirth: 2001,
    gender: "male",
    address: "",
    systemRole: "637243de9b9759182547755b",
    createdAt: "2022-11-19T06:26:29.891Z",
    updatedAt: "2022-11-27T08:49:48.968Z",
    avatar: "https://tecostore.vn/assets/img/avatar-author.png",
    isActivated: true
},
{
  roles: {
      owner: [
          "63787715635663efa6d6f0c3",
          "63789ed25c5e5f9da32beddf",
          "6378a305bcedb2bd4e654e6f",
          "6378b093eb54c7888fb241cd",
          "6381dcf385d73ce877612ddf"
      ],
      co_owner: [],
      member: []
  },
  _id: "2",
  email: "nambd11102001@gmail.com",
  password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
  firstname: "Nam",
  lastname: "Nguyen",
  yearOfBirth: 2001,
  gender: "male",
  address: "",
  systemRole: "637243de9b9759182547755b",
  createdAt: "2022-11-19T06:26:29.891Z",
  updatedAt: "2022-11-27T08:49:48.968Z",
  avatar: "https://tecostore.vn/assets/img/avatar-author.png",
  isActivated: true
},
{
  roles: {
      owner: [
          "63787715635663efa6d6f0c3",
          "63789ed25c5e5f9da32beddf",
          "6378a305bcedb2bd4e654e6f",
          "6378b093eb54c7888fb241cd",
          "6381dcf385d73ce877612ddf"
      ],
      co_owner: [],
      member: []
  },
  _id: "3",
  email: "nambd11102001@gmail.com",
  password: "$2a$10$y2s7HUzy7v4ADbVTl2ktQO0ncqcAU4.0dolDo9Mt2qRAj/IHQ4AlW",
  firstname: "Nam",
  lastname: "Nguyen",
  yearOfBirth: 2001,
  gender: "male",
  address: "",
  systemRole: "637243de9b9759182547755b",
  createdAt: "2022-11-19T06:26:29.891Z",
  updatedAt: "2022-11-27T08:49:48.968Z",
  avatar: "https://tecostore.vn/assets/img/avatar-author.png",
  isActivated: true
}
]

const GroupDetailPageComponent: FC = () => {
  return <GroupDetail group={data} owner={owner} coOwners={coOwners} members={members}/>
}

export const GroupDetailPage = memo(GroupDetailPageComponent);