/*************************************************
 * 文件描述：
 *************************************************/
package com.DataRoom.common;

import java.io.File;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


/**
 * @author jake
 * 2012-12-5
 */
public class ZipCompressUtils {


	private static final int BUFFER = 8192;
	private File zipFile;
	
	public ZipCompressUtils(String zipFileName){
		zipFile = new File(zipFileName);
	}

	public void compress(String []filePathNameList) {
			try {
				File file = null;
				FileOutputStream fileOutputStream = new FileOutputStream(zipFile);
				CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream,new CRC32());
				ZipOutputStream out = new ZipOutputStream(cos);
//				out.setEncoding("GBK");
				String basedir = "";
				for(String fileName:filePathNameList){
					file = new File(fileName);
					if (!file.exists()){
						System.out.println("file："+fileName + "not exist！");
						continue;
					}
					compress(file, out, basedir);
				}
				out.close();
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		private void compress(File file, ZipOutputStream out, String basedir) {
			/* 判断是目录还是文件 */
			if (file.isDirectory()) {
//				System.out.println("压缩：" + basedir + file.getName());
				this.compressDirectory(file, out, basedir);
			} else {
//				System.out.println("压缩：" + basedir + file.getName());
				this.compressFile(file, out, basedir);
			}
		}

		/** 压缩一个目录 */
		private void compressDirectory(File dir, ZipOutputStream out, String basedir) {
			if (!dir.exists()){
				return;
			}
			File[] files = dir.listFiles();
			for (int i = 0; i < files.length; i++) {
				/* 递归 */
				compress(files[i], out, basedir + dir.getName() + "/");
			}
		}

		/** 压缩一个文件 */
		private void compressFile(File file, ZipOutputStream out, String basedir) {
			if (!file.exists()) {
				return;
			}
			try {
				BufferedInputStream bis = new BufferedInputStream(
						new FileInputStream(file));
				ZipEntry entry = new ZipEntry(basedir + file.getName());
				out.putNextEntry(entry);
				int count;
				byte data[] = new byte[BUFFER];
				while ((count = bis.read(data, 0, BUFFER)) != -1) {
					out.write(data, 0, count);
				}
				bis.close();
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}
	/**
	 * function description:
	 * author: jake
	 * date: 2012-12-5
	 * params: @param args
	 * return: void
	 */
	public static void main(String[] args) {
		ZipCompressUtils zip = new ZipCompressUtils("D:\\dd.zip");
		String fileList[] ={"\\\\SINFIELD-PC\\ohyes\\assets\\柱状图.png","\\\\SINFIELD-PC\\ohyes\\assets\\折线图.png","\\\\SINFIELD-PC\\ohyes\\assets\\zz.png"};
		zip.compress(fileList);
	}

}
