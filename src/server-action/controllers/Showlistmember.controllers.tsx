import { NextRequest, NextResponse } from "next/server";
import { validationResult } from "express-validator";
import { showlistmember } from "../services/Showlistuser.service";
export const listMember = async(req:NextRequest,res:NextResponse,id: number)=>{
    if (req.method === "GET") {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return NextResponse.json(
              {
                message: errors.array(),
              },
              { status: 400 }
            );
          }
          const showListMember = await showlistmember({ groupId: id });
          return NextResponse.json(
            {
              success: true,
              message: "Success Show List Member",
              data: showListMember,
            },
            { status: 200 }
          );
        } catch (error: any) {
          console.error("Error create group:", error);
          return NextResponse.json(
            {
              success: false,
              message: error.message,
            },
            { status: 400 }
          );
        }
      } else{
        return NextResponse.json(
            {
              success: false,
              message: `Method ${req.method} is invalid`,
            },
            { status: 500 }
          );
      }
}