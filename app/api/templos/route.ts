import { NextResponse } from 'next/server';
import { getAllTemplos } from '@/lib/data';

export async function GET() {
  try {
    const templos = getAllTemplos();
    return NextResponse.json(templos);
  } catch (error) {
    console.error('Error fetching templos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templos' },
      { status: 500 }
    );
  }
} 