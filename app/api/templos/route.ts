import { NextResponse } from 'next/server';
import { getAllTemplos as getAllTemplosFromData } from '@/lib/data.js';

export async function GET() {
  try {
    console.log('Using local data for templos API');
    const templos = getAllTemplosFromData();
    return NextResponse.json(templos);
  } catch (error) {
    console.error('Error fetching templos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templos' },
      { status: 500 }
    );
  }
} 