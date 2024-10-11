import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Retrieve the form data (uploaded file)
    const formData = await request.formData();
    const file = formData.get('file');

    // Send the file to your backend or external API (like DeepAI)
    const response = await fetch('http://localhost:3001/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    // Return the response from the external API
    return NextResponse.json({ output_url: data.output_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
