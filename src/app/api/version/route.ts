import { NextResponse } from 'next/server';

interface VersionInfo {
  android: string;
  ios: string;
  windows: string;
  mac: string;
}

export async function GET() {
  const version: VersionInfo = {
    android: '1.0.0',
    ios: '1.0.0',
    windows: '1.0.0',
    mac: '1.0.0',
  };

  return NextResponse.json({ latest: version, updateRequired: false });
}