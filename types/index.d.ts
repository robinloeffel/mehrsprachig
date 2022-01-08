interface Sources {
  [key: string]: string
}

interface MehrsprachigOptions {
  selector?: string,
  trigger?: string,
  fallback?: string,
  sources?: Sources
}

export default function mehrsprachig(options?: MehrsprachigOptions): undefined;
