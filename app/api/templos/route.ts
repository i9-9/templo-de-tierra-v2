import { NextResponse } from 'next/server';
import { getAllTemplos } from '@/lib/templos';

export async function GET() {
  try {
    // Usar datos locales en lugar de BD
    const templos = await getAllTemplos();
    return NextResponse.json(templos);
  } catch (error) {
    console.error('Error fetching templos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templos' },
      { status: 500 }
    );
  }
} 