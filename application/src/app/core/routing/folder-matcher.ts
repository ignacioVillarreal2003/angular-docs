import { UrlSegment } from '@angular/router';

export function folderMatcher(segments: UrlSegment[]) {
  if (segments.length && segments[0].path === 'folder') {
    return {
      consumed: segments,
      posParams: {
        path: new UrlSegment(segments.slice(1).map(s => s.path).join('/'), {})
      }
    };
  }
  return null;
}
