#!/usr/bin/env node

import { Command } from "commander";
import { ethers } from "ethers";
import chalk from "chalk";
import 'dotenv/config';
import pkg from "./package.json" assert { type: "json" };

const program = new Command();

const DEFAULT_RPC_URL = process.env.RPC_URL || "https://mainnet.infura.io/v3/API_KEY";

program
  .name("ens-check")
  .version(pkg.version)
  .description("Check availability of ENS names")
  .argument("<names...>", "ENS names to check (e.g. vitalik.eth)")
  .option("-n, --network <url>", "Ethereum RPC URL", DEFAULT_RPC_URL)
  .action(async (names, options) => {
    const provider = new ethers.JsonRpcProvider(options.network);

    for (const name of names) {
      if (!name.endsWith(".eth")) {
        console.log(chalk.yellow(`⚠️ Skipped ${name} (not a .eth name)`));
        continue;
      }
      try {
        const address = await provider.resolveName(name);
        if (address) {
          console.log(chalk.red(`❌ Taken  ${name} -> ${chalk.gray(address)}`));
        } else {
          console.log(chalk.green(`✅ Available  ${name}`));
        }
      } catch (err) {
        console.error(chalk.yellow(`⚠️ Error ${name}: ${err.message}`));
      }
    }
  });

program.parse(process.argv);
