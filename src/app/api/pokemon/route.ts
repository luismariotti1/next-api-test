import {NextResponse} from 'next/server'
import {Pokemon} from "@prisma/client";
import prisma from "@/lib/prisma";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";

export async function GET(): Promise<NextResponse> {
    const pokemon: Pokemon[] = await prisma.pokemon.findMany();
    return NextResponse.json(pokemon);
}

export async function POST(request: Request) {
    const data = await request.json();
    const pokemon: Pokemon = await prisma.pokemon.create({
        data: {
            name: data.name,
            type: data.type,
            hp: data.hp,
            atk: data.atk,
            def: data.def,
        }
    });
    return NextResponse.json(pokemon);
}