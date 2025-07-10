// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Apache24/htdocs/center/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Apache24/htdocs/center/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwindcss from "file:///C:/Apache24/htdocs/center/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Apache24/htdocs/center/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_import_meta_url = "file:///C:/Apache24/htdocs/center/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    //테일윈드 관련 플러그인 ( 테일윈드 플러그인 타입정의가 맞지 않아서 길게 작성)
    {
      name: "tailwindcss",
      enforce: "pre",
      async transform(src, id) {
        if (id.endsWith(".css")) {
          return {
            map: null
            // return source map if available
          };
        }
      }
    },
    {
      name: "postcss-import",
      enforce: "pre",
      async transform(src, id) {
        if (id.endsWith(".css")) {
          return {
            map: null
            // return source map if available
          };
        }
      }
    },
    {
      name: "autoprefixer",
      enforce: "post",
      async transform(src, id) {
        if (id.endsWith(".css")) {
          return {
            map: null
            // return source map if available
          };
        }
      }
    }
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
        // formsPackage.default,
      ]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  define: {
    "global": {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxBcGFjaGUyNFxcXFxodGRvY3NcXFxcY2VudGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxBcGFjaGUyNFxcXFxodGRvY3NcXFxcY2VudGVyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9BcGFjaGUyNC9odGRvY3MvY2VudGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuLy8gaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xyXG5cclxuXHJcbi8vIHZ1ZURldlRvb2xzKCksXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSwgXHJcbiAgICAgIC8vXHVEMTRDXHVDNzdDXHVDNzA4XHVCNERDIFx1QUQwMFx1QjgyOCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggKCBcdUQxNENcdUM3N0NcdUM3MDhcdUI0REMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1RDBDMFx1Qzc4NVx1QzgxNVx1Qzc1OFx1QUMwMCBcdUI5REVcdUM5QzAgXHVDNTRBXHVDNTQ0XHVDMTFDIFx1QUUzOFx1QUM4QyBcdUM3OTFcdUMxMzEpXHJcbiAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICd0YWlsd2luZGNzcycsXHJcbiAgICAgICAgICBlbmZvcmNlOiAncHJlJyxcclxuICAgICAgICAgIGFzeW5jIHRyYW5zZm9ybShzcmMsIGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5lbmRzV2l0aCgnLmNzcycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hcDogbnVsbCwgLy8gcmV0dXJuIHNvdXJjZSBtYXAgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdwb3N0Y3NzLWltcG9ydCcsXHJcbiAgICAgICAgICBlbmZvcmNlOiAncHJlJyxcclxuICAgICAgICAgIGFzeW5jIHRyYW5zZm9ybShzcmMsIGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5lbmRzV2l0aCgnLmNzcycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hcDogbnVsbCwgLy8gcmV0dXJuIHNvdXJjZSBtYXAgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdhdXRvcHJlZml4ZXInLFxyXG4gICAgICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgYXN5bmMgdHJhbnNmb3JtKHNyYywgaWQpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmVuZHNXaXRoKCcuY3NzJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWFwOiBudWxsLCAvLyByZXR1cm4gc291cmNlIG1hcCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sICBcclxuICAgIF0sXHJcblxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICB0YWlsd2luZGNzcygpLFxyXG4gICAgICAgICAgYXV0b3ByZWZpeGVyKCksXHJcbiAgICAgICAgICAvLyBmb3Jtc1BhY2thZ2UuZGVmYXVsdCxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIFxyXG4gIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICB9XHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICAgICdnbG9iYWwnOiB7fVxyXG4gIH1cclxuICBcclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXFRLFNBQVMsZUFBZSxXQUFXO0FBRXhTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQU53SSxJQUFNLDJDQUEyQztBQVVsTixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUE7QUFBQSxJQUVKO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxNQUFNLFVBQVUsS0FBSyxJQUFJO0FBQ3ZCLFlBQUksR0FBRyxTQUFTLE1BQU0sR0FBRztBQUN2QixpQkFBTztBQUFBLFlBQ0wsS0FBSztBQUFBO0FBQUEsVUFDUDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULE1BQU0sVUFBVSxLQUFLLElBQUk7QUFDdkIsWUFBSSxHQUFHLFNBQVMsTUFBTSxHQUFHO0FBQ3ZCLGlCQUFPO0FBQUEsWUFDTCxLQUFLO0FBQUE7QUFBQSxVQUNQO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsTUFBTSxVQUFVLEtBQUssSUFBSTtBQUN2QixZQUFJLEdBQUcsU0FBUyxNQUFNLEdBQUc7QUFDdkIsaUJBQU87QUFBQSxZQUNMLEtBQUs7QUFBQTtBQUFBLFVBQ1A7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNKO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUE7QUFBQSxNQUVmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVGLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixVQUFVLENBQUM7QUFBQSxFQUNiO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
