package com.tugasapl.datakaryawan

import org.springframework.boot.ApplicationRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class DataKaryawanApplication  {

	@Bean
	fun run(repository: EmployeeRepository) = ApplicationRunner {
		repository.save(EmployeeModel(
			name = "Jimi Hendrix",
			position = "Manager"
		))
		repository.save(EmployeeModel(
			name = "Lucas Gabriel",
			position = "Office Boy"
		))
	}

}

fun main(args: Array<String>) {
	runApplication<DataKaryawanApplication>(*args)
}