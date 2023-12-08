import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    const people = await prisma.person.findMany();
    return new Response(JSON.stringify(people), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const {firstname, lastname, phone} = body;
        if (!firstname || !lastname || !phone) {
            return new Response('Missing required fields', {
                status: 400,
            })
        }
        
        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
            }
        })

        //return the data record
        return new Response(JSON.stringify(person), {
            status: 202,
        })

    } catch (error) {
        return new Response('Error', {
            status: 500,
        })
        
    }


}

export async function DELETE(request: NextRequest, context: any) {
    try {
      const { id } = context.params;
  
      // Check if the person exists in the database
      const person = await prisma.person.findUnique({
        where: {
          id: parseInt(id as string, 10),
        },
      });
  
      // If the person doesn't exist, return a 404 status code
      if (!person) {
        return new Response('Person not found', {
          status: 404,
        });
      }
  
      // If the person exists, delete them from the database
      const deletedPerson = await prisma.person.delete({
        where: {
          id: parseInt(id as string, 10),
        },
      });
  
      return new Response('Person deleted successfully', {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response('Server error', { status: 500 });
    }
  }
