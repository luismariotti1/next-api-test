import {NextResponse} from 'next/server'
import {Pokemon} from "@prisma/client";
import prisma from "@/lib/prisma";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";

export async function GET(request: Request, {params}: { params: { id: string } }): Promise<NextResponse> {
    const pokemon: Pokemon|null = await prisma.pokemon.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    return NextResponse.json(pokemon);
}

export async function DELETE(request: Request, {params}: { params: { id: string } }): Promise<NextResponse> {
    const pokemon: Pokemon|null = await prisma.pokemon.delete({
        where: {
            id: parseInt(params.id)
        }
    });
    return NextResponse.json(pokemon);
}

export async function PUT(request: Request, {params}: { params: { id: string } }): Promise<NextResponse> {
    const data = await request.json();
    const pokemon: Pokemon = await prisma.pokemon.update({
        where: {
            id: parseInt(params.id)
        },
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