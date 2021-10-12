// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { mockMessageList } from "../../../mockData/mockMessageList"
import { MessageListType } from "../../../types/MessageListType"

type Data = {
  msg_list: Array<MessageListType>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  console.info("get msg-list")
  if(req.method === "GET") {
    res.status(200).json({ msg_list: mockMessageList })
  } else if(req.method === "POST") {
    mockMessageList.push(JSON.parse(req.body))
    res.status(201).json({ msg_list: mockMessageList })
  }
}
