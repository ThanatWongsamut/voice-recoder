import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from '@/utils/s3';

export async function POST(request: NextRequest) {
  try {
    // Verify client ID
    const cookiesStore = await cookies()
    const clientId = cookiesStore.get('clientid')?.value;
    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'Client ID not found' },
        { status: 401 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();
    const passageId = formData.get('passageId');
    const language = formData.get('language');
    const audioFile = formData.get('audio') as Blob;

    // Validate inputs
    if (!passageId || !language || !audioFile) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['en', 'th'].includes(language.toString())) {
      return NextResponse.json(
        { success: false, error: 'Invalid language' },
        { status: 400 }
      );
    }

    // Generate S3 key (path)
    const timestamp = Date.now();
    const s3Key = `recordings/${clientId}/${passageId}_${language}_${timestamp}.wav`;

    // Convert Blob to Buffer for upload
    const buffer = Buffer.from(await audioFile.arrayBuffer());

    // Create multipart upload to S3
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: s3Key,
        Body: buffer,
        ContentType: 'audio/wav',
        Metadata: {
          clientId,
          passageId: passageId.toString(),
          language: language.toString(),
          timestamp: timestamp.toString(),
        },
      },
    });

    // Upload with progress tracking
    const result = await upload.done();

    // Return success response with file details
    return NextResponse.json(
      {
        success: true,
        data: {
          key: s3Key,
          url: result.Location, // S3 URL of the uploaded file
          etag: result.ETag,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/recording:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload recording'
      },
      { status: 500 }
    );
  }
}
